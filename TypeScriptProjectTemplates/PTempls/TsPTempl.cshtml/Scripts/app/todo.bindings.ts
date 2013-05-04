/// <reference path="..\jquery.d.ts" />
/// <reference path="..\jquery.validation.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="..\modernizr-2.6.d.ts" />


interface KnockoutBindingHandlers {
    validate: KnockoutBindingHandler;
    selected: KnockoutBindingHandler;
    blurOnEnter: KnockoutBindingHandler;
    placeholder: KnockoutBindingHandler;
}

// Hooks up a form to jQuery Validation
ko.bindingHandlers.validate = {
    init: function (elem, valueAccessor) {
        $(elem).validate();
    }
};

interface KnockoutStatic {
    isWriteableObservable(val: any): void;
}

// Controls whether or not the text in a textbox is selected based on a model property
ko.bindingHandlers.selected = {
    init: function (elem, valueAccessor) {
        $(elem).blur(function () {
            var boundProperty = valueAccessor();
            if (ko.isWriteableObservable(boundProperty)) {
                boundProperty(false);
            }
        });
    },
    update: function (elem, valueAccessor) {
        var shouldBeSelected = ko.utils.unwrapObservable(valueAccessor());
        if (shouldBeSelected) {
            $(elem).select();
        }
    }
};


// Makes a textbox lose focus if you press "enter"
ko.bindingHandlers.blurOnEnter = {
    init: function (elem, valueAccessor) {
        $(elem).keypress(function (evt: JQueryKeyEventObject) {
            if (evt.keyCode === 13 /* enter */) {
                evt.preventDefault();
                $(elem).triggerHandler("change");
                $(elem).blur();
            }
        });
    }
};

// Simulates HTML5-style placeholders on older browsers
ko.bindingHandlers.placeholder = {
    init: function (elem, valueAccessor) {
        var placeholderText = ko.utils.unwrapObservable(valueAccessor()),
            input = $(elem);

        input.attr('placeholder', placeholderText);

        // For older browsers, manually implement placeholder behaviors
        if (!Modernizr['input'].placeholder) {
            input.focus(function () {
                if (input.val() === placeholderText) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                setTimeout(function () {
                    if (input.val() === '' || input.val() === placeholderText) {
                        input.addClass('placeholder');
                        input.val(placeholderText);
                    }
                }, 0);
            }).blur();

            input.parents('form').submit(function () {
                if (input.val() === placeholderText) {
                    input.val('');
                }
            });
        }
    }
};