// https://stackoverflow.com/questions/15975922/how-to-use-jquery-insertatcaret-function
jQuery.fn.extend({
    insertAtCaret: function(myValue) {
        return this.each(function(i) {
            if (document.selection) {
                // For browsers like Internet Explorer
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == '0') {
                // For browsers like Firefox and Webkit based
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});

// disclaimer: I am not a JavaScript developer! sorry for whatever the hell this is (:
$(document).ready(function() {
    var spaceMode = false;
    var lastSelectionStart = null;
    $("#demo-simple").on("keypress", function(event) {
        if (lastSelectionStart != this.selectionStart) {
            spaceMode = false;
        }

        if (event.which == 32) {
            spaceMode = !spaceMode;
            if (spaceMode) {
                event.preventDefault();
            }
        } else {
            var mode = $("select[name=case]").val();

            if (spaceMode) {
                switch (mode) {
                    case "snake": // snake_case
                        $(this).insertAtCaret("_");
                        break;
                    case "kebab": // kebab-case
                        $(this).insertAtCaret("-");
                        break;
                    case "camel": // camelCase
                        event.preventDefault();
                        $(this).insertAtCaret(String.fromCharCode(event.which).toUpperCase());
                        break;
                    case "class": // ClassCase
                        event.preventDefault();
                        $(this).insertAtCaret(String.fromCharCode(event.which).toUpperCase());
                        break;
                    case "train": // Train-Case
                        $(this).insertAtCaret("-");
                        event.preventDefault();
                        $(this).insertAtCaret(String.fromCharCode(event.which).toUpperCase());
                        break;
                    default:
                }
            } else if (mode == "class" || mode == "train") {
                // TODO
            }
            spaceMode = false;
        }
        lastSelectionStart = this.selectionStart;
    });

    const rustKeywords = ["as", "async", "await", "break", "const", "continue", "crate", "dyn", "else", "enum", "extern", "false", "fn", "for", "if", "impl", "in", "let", "loop", "match", "mod", "move", "mut", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "type", "unsafe", "use", "where", "while"];
    $("#demo-contextual").on("keypress", function(event) {
        if (lastSelectionStart != this.selectionStart) {
            spaceMode = false;
        }

        var char = String.fromCharCode(event.which);
        var leading = this.value.substring(0, this.selectionStart);
        var regexp = /[a-z0-9]+$/i;
        var word = regexp.exec(leading)[0];

        if (event.which == 32 && word != null && !rustKeywords.includes(word)) {
            spaceMode = !spaceMode;
            if (spaceMode) {
                event.preventDefault();
            }
        } else if (spaceMode) {
            if (regexp.test(char)) {
                $(this).insertAtCaret("_");
            } else {
                $(this).insertAtCaret(" ");
            }
            spaceMode = false;
        }

        lastSelectionStart = this.selectionStart;
    });
});
