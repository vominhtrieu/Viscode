import Blockly from "blockly";

Blockly.Blocks["variables_null"] = {
  init: function () {
    this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("null");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("When a variable is null, it has no value");
    this.setHelpUrl("https://en.wikipedia.org/wiki/Null_pointer");
  },
};

Blockly.JavaScript["variables_null"] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "null";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
