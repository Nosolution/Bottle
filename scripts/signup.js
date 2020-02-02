'use strict';

$().ready(function () {
    $("form").validate({
        rules: {
            username: "required",
            email: {
                required: true,
                email: true
            },
            password: "required",
            confirm_password: {
                required: true,
                equalTo: "#password"
            }

        },
        messages: {
            username: "Please enter your username",
            email: {
                required: "Please enter your email address",
                email: "Please enter correct format"
            },
            password: "Please enter your password",
            confirm_password: "Please re-enter your password"
        },
        errorPlacement: function (error, element) {
            $(element).parent().after(error);
        },
        wrapper: "div",
        showErrors: function (errorMap, errorList) {
            // 遍历错误列表
            for (let obj in errorMap) {
                // 自定义错误提示效果
                $('#' + obj).parent().addClass('error');
            }
            // 此处注意，一定要调用默认方法，这样保证提示消息的默认效果
            this.defaultShowErrors();
        },
        success: function (label) {
            $(label).parent().prev().removeClass('error');
        },
        submitHandler: function () {
            // $("form").preventDefault();

            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8080/signup",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    username: $("#username").val(),
                    email: $("#email").val(),
                    // password: Base64.encode($("#password").val())
                    password: $("#password").val()
                }),
                success: function () {
                    console.log("注册成功");
                },
                error: function (errorMsg) {
                    alert("注册失败：" + errorMsg);
                }
            })
        }

    });


});
