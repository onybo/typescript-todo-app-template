/// <reference path="..\jquery.d.ts" />
/// <reference path="..\jquery.validation.d.ts" />

module Todo {
    
    class AjaxLogin {
        
        public setup()
        {
            $("#showRegister").click(function () {
                $("#loginPanel").hide("slide", function () {
                    $("#registerPanel").show("slide", function () {
                        $("#registerName").focus();
                    });
                });
            });

            $("#showLogin").click(function () {
                $("#registerPanel").hide("slide", function () {
                    $("#loginPanel").show("slide", function () {
                        $("#loginName").focus();
                    });
                });
            });

            $("#loginForm").submit(formSubmitHandler);
            $("#registerForm").submit(formSubmitHandler);
        }
    }

    private getValidationSummaryErrors = function($form: JQuery) : JQuery {
        var errorSummary = $form.find('.validation-summary-errors, .validation-summary-valid');
        return errorSummary;
    }

    private displayErrors = function(form: JQuery, errors: string[]): void {
        var errorSummary = getValidationSummaryErrors(form)
            .removeClass('validation-summary-valid')
            .addClass('validation-summary-errors');

        var items = $.map(errors, function (error: string) {
            return '<li>' + error + '</li>';
        }).join('');

        var ul = errorSummary
            .find('ul')
            .empty()
            .append(items);
    }

    private formSubmitHandler = function(e: JQueryEventObject) : void {
        var $form = $(this);

        // We check if jQuery.validator exists on the form
        if (!$form.valid || $form.valid()) {
            $.post($form.attr('action'), $form.serializeArray())
                .done(function (json) {
                    json = json || {};

                    // In case of success, we redirect to the provided URL or the same page.
                    if (json.success) {
                        location = json.redirect || location.href;
                    } else if (json.errors) {
                        displayErrors($form, json.errors);
                    }
                })
                .fail(function () {
                    displayErrors($form, ['An unknown error happened.']);
                });
        }

        // Prevent the normal behavior since we opened the dialog
        e.preventDefault();
    }

    new AjaxLogin().setup();
}
