IlocProgram 
    = _ ins_list:InstructionList _ { return new ILOC.IlocProgram({instructions: ins_list}); } 
 
InstructionList 
    =  _ l:(l:label _ ":" _ { return l; })? ins:Instruction _ "\n"_ ins_list:InstructionList _ { ins.label = l; ins_list.unshift(ins); return ins_list; }
    / _ l:(l:label _ ":" _ { return l; })? ins:Instruction _ "\n" _ { ins.label = l; return [ ins ]; }

Instruction 
    = _ op:Operation _ { return new ILOC.Instruction({operations: [ op ]}); } 
    / _ "[" _ op_list:OperationList _ "]" _ { return new ILOC.Instruction({ operations: op_list }); } 
 
OperationList 
    = _ op:Operation _ ";" _ op_list:OperationList _ { op_list.unshift(op); return op_list; } 
    / _ op:Operation _ { return [ op ]; } 
 
Operation 
    = _ op:NormalOp _ { return op; } 
    / _ op:ControlFlowOp _ { return op; } 
 
NormalOp = 
    _ oc:opcode _ s:OperandList _ "=>" _ t:OperandList _ { return new ILOC.NormalOperation({ opcode:oc, sources: s, targets: t, }); } 
 
ControlFlowOp 
    = _ oc:opcode _ s:(s:OperandList _ "->" { return s; })? _ t:OperandList _ { console.log(oc); console.log(s); return new ILOC.ControlFlowOperation({opcode:oc, sources: s, targets: t, }); } 
    / _ oc: opcode _ { return new ILOC.ControlFlowOperation({opcode:oc}); } 
 
OperandList 
    = _ op:Operand _ "," _ op_list:OperandList _ { op_list.unshift(op); return op_list; }
    / _ op:Operand _ { return [ op ]; } 
 
Operand 
    = _ r:register _ { return r; } 
    / _ n:num _ { return n; } 
    / _ l:label _ { return l; }
 
register 
    = _ "r" n:([0-9a-z_]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.register, name: n.join("") }); } 
 
label 
    = _ n:([0-9a-z_]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.label, name: n.join("") }); } 
 
num 
    = _ n:([0-9]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.num, name: n.join("") }); } 
 
opcode 
    = _ n:([a-z0-9_]i)+ _ { return n.join(""); } 
 
_ 
  = w:[ \t\r]* { return w; } 
 
__ 
  = w:[ \t\r]+ { return w; }
