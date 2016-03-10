{
    var definition_counts = {};
    var op_count = 0;
}

IlocProgram
    = _ ins_list:InstructionList _ {
        return new ILOC.IlocProgram({
            instructions: ins_list
        });
    }

InstructionList
    =  _ l:(l:label _ ":" _ { return l; })? _ ins:Instruction ins_list:(mandatory_newline ins_list:InstructionList _n { return ins_list; })? {
        ins.label = l;
        if(ins_list != undefined) {
            ins_list.unshift(ins);
            return ins_list;
        } else {
            return [ins]
        };
    }

Instruction
    = _ op:Operation _ {
        return new ILOC.Instruction({
            operations: [ op ]
        });
    }
    / _ "[" _ op_list:OperationList _ "]" _ {
        return new ILOC.Instruction({
            operations: op_list
        });
    }

OperationList
    = _ op:Operation _ ";" _ op_list:OperationList _ { op_list.unshift(op); return op_list; }
    / _ op:Operation _ { return [ op ]; }

Operation
    = _ op:Assignment _ { return op; }
    / _ op:Branch _ { return op; }

Assignment =
    _ oc:opcode _ s:OperandList _ "=>" _ t:OperandList _ {
        try {
            if (ILOC.MEMORY_LOAD_OPCODES.hasOwnProperty(oc)) {
                return new ILOC.MemoryLoadOperation({
                    opcode : oc,
                    sources: s || [],
                    targets: (
                        t != undefined ?
                            t.map(function(operand) {
                                if (definition_counts[operand.name]==undefined) {
                                    definition_counts[operand.name] = 1
                                };
                                operand.index = definition_counts[operand.name]++;
                                return operand;
                            }) : []
                    )
                });                 
            } else if (ILOC.MEMORY_STORE_OPCODES.hasOwnProperty(oc)) {
                return new ILOC.MemoryStoreOperation({
                    opcode : oc,
                    sources: s || [],
                    targets: t || [],
                });                 
            } else {
                return new ILOC.NormalOperation({
                    opcode : oc,
                    sources: s || [],
                    targets: (
                        t != undefined ?
                            t.map(function(operand) {
                                if (definition_counts[operand.name]==undefined) {
                                    definition_counts[operand.name] = 1
                                };
                                operand.index = definition_counts[operand.name]++;
                                return operand;
                            }) : []
                    )
                });
            }
        } catch (ex) {
            error(ex.message);
        }
    }

Branch
    = _ oc:opcode _ s:(s:OperandList _ "->" { return s; })? _ t:OperandList _ {
        try {
            return new ILOC.ControlFlowOperation({
                opcode :oc,
                sources: s || [],
                targets: t || [],
            });
        } catch (ex) {
            error(ex.message);
        }
    }
    / _ oc: opcode _ {
        try {
            return new ILOC.ControlFlowOperation({
                opcode : oc,
                sources: [],
                targets: []});
        } catch (ex) {
            error(ex.message);
        }
    }

OperandList
    = _ op:Operand _ "," _ op_list:OperandList _ { op_list.unshift(op); return op_list; }
    / _ op:Operand _ { return [ op ]; }

Operand
    = _ r:register _ { return r; }
    / _ n:num _ { return n; }
    / _ c:cc _ { return c; }
    / _ l:label _ { return l; }

register
    = _ "r" n:([0-9a-z_]i)+ _ {
        return new ILOC.Operand({
            type: ILOC.OPERAND_TYPES.register,
            name: n.join("")
        });
    }

label
    = _ n:([0-9a-z_]i)+ _ {
        return new ILOC.Operand({
            type: ILOC.OPERAND_TYPES.label,
            name: n.join("")
        });
    }

num
    = _ n:([0-9-]i)+ _ {
        return new ILOC.Operand({
            type: ILOC.OPERAND_TYPES.num,
            name: n.join("")
        });
    }

cc
    = _ n:'cc' _ {
        return new ILOC.Operand({
            type: ILOC.OPERAND_TYPES.cc,
            name: n,
        });
    }

opcode
    = _ n:([a-z0-9_]i)+ _ { return n.join(""); }

_
    = w:[ \t\r]* { return w; }

__
    = w:[ \t\r]+ { return w; }

_n
    = w:[ \n\t\r]* { return w; }

mandatory_newline
    = w:[ \t\r]*"\n"[ \t\r]* { return w; }
