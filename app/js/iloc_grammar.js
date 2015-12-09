var iloc_grammar = '\
{ \n\
  var definition_counts = {}; \n\
  var count = 0; \n\
} \n\
 \n\
IlocProgram \n\
    = _ ins_list:InstructionList _ { return new ILOC.IlocProgram({instructions: ins_list}); } \n\
 \n\
InstructionList \n\
    =  _ l:(l:label _ ":" _ { return l; })? _ ins:Instruction ins_list:(mandatory_newline ins_list:InstructionList { return ins_list; })? _n { ins.label = l; if(ins_list != undefined) { ins_list.unshift(ins); return ins_list; } else { return [ins] } } \n\
    /* / _ l:(l:label _ ":" _ { return l; })? _ ins:Instruction "\\n"* _ { ins.label = l; return [ ins ]; } */ \n\
\n\
Instruction \n\
    = _ op:Operation _ { return new ILOC.Instruction({operations: [ op ]}); } \n\
    / _ "[" _ op_list:OperationList _ "]" _ { return new ILOC.Instruction({ operations: op_list }); } \n\
 \n\
OperationList \n\
    = _ op:Operation _ ";" _ op_list:OperationList _ { op_list.unshift(op); return op_list; } \n\
    / _ op:Operation _ { return [ op ]; } \n\
 \n\
Operation \n\
    = _ op:NormalOp _ { return op; } \n\
    / _ op:ControlFlowOp _ { return op; } \n\
 \n\
NormalOp = \n\
    _ oc:opcode _ s:OperandList _ "=>" _ t:OperandList _ { return new ILOC.NormalOperation({ opcode:oc, sources: s, targets: t.map(function(operand) { if (definition_counts[operand.name]==undefined) { definition_counts[operand.name] = 1 }; operand.index=definition_counts[operand.name]++; return operand; }) }); } \n\
 \n\
ControlFlowOp \n\
    = _ oc:opcode _ s:(s:OperandList _ "->" { return s; })? _ t:OperandList _ { return new ILOC.ControlFlowOperation({opcode:oc, sources: s, targets: t, }); } \n\
    / _ oc: opcode _ { return new ILOC.ControlFlowOperation({opcode:oc}); } \n\
 \n\
OperandList \n\
    = _ op:Operand _ "," _ op_list:OperandList _ { op_list.unshift(op); return op_list; }\n\
    / _ op:Operand _ { return [ op ]; } \n\
 \n\
Operand \n\
    = _ r:register _ { return r; } \n\
    / _ n:num _ { return n; } \n\
    / _ l:label _ { return l; }\n\
 \n\
register \n\
    = _ "r" n:([0-9a-z_]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.register, name: n.join("") }); } \n\
 \n\
label \n\
    = _ n:([0-9a-z_]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.label, name: n.join("") }); } \n\
 \n\
num \n\
    = _ n:([0-9]i)+ _ { return new ILOC.Operand({ type: ILOC.OPERAND_TYPES.num, name: n.join("") }); } \n\
 \n\
opcode \n\
    = _ n:([a-z0-9_]i)+ _ { return n.join(""); } \n\
 \n\
_ \n\
  = w:[ \\t\\r]* { return w; } \n\
 \n\
__ \n\
  = w:[ \\t\\r]+ { return w; } \n\
_n \n\
  = w:[ \\n\\t\\r]* { return w; } \n\
 \n\
mandatory_newline \n\
  = w:[ \\t\\r]*"\\n"[ \\n\\t\\r]* { return w; } \n\
'
