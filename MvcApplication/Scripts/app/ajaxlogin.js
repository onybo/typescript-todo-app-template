/// <reference path="..\jquery.d.ts" />
/// <reference path="..\jquery.validation.d.ts" />
var Todo;
(function (Todo) {
    var AjaxLogin = (function () {
        function AjaxLogin() { }
        AjaxLogin.prototype.setup = function () {
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
            $("#loginForm").submit(Todo.formSubmitHandler);
            $("#registerForm").submit(Todo.formSubmitHandler);
        };
        return AjaxLogin;
    })();    
    Todo.getValidationSummaryErrors = function ($form) {
        var errorSummary = $form.find('.validation-summary-errors, .validation-summary-valid');
        return errorSummary;
    };
    Todo.displayErrors = function (form, errors) {
        var errorSummary = Todo.getValidationSummaryErrors(form).removeClass('validation-summary-valid').addClass('validation-summary-errors');
        var items = $.map(errors, function (error) {
            return '<li>' + error + '</li>';
        }).join('');
        var ul = errorSummary.find('ul').empty().append(items);
    };
    Todo.formSubmitHandler = function (e) {
        var $form = $(this);
        // We check if jQuery.validator exists on the form
        if(!$form.valid || $form.valid()) {
            $.post($form.attr('action'), $form.serializeArray()).done(function (json) {
                json = json || {
                };
                // In case of success, we redirect to the provided URL or the same page.
                if(json.success) {
                    location = json.redirect || location.href;
                } else if(json.errors) {
                    Todo.displayErrors($form, json.errors);
                }
            }).fail(function () {
                Todo.displayErrors($form, [
                    'An unknown error happened.'
                ]);
            });
        }
        // Prevent the normal behavior since we opened the dialog
        e.preventDefault();
    };
    new AjaxLogin().setup();
})(Todo || (Todo = {}));
//@ sourceMappingURL=ajaxlogin.js.map
