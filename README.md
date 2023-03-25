# Serverless - authentication

This is a simple example of how to use authentication in a serverless application.

## Functions

#### /sign-in

Sign in function. It will return a JWT token. Refresh token is stored in a cookie.

TODO: When the user signed in, email will be sent to the user (user is logged in).

#### /sign-up

Sign up function. It will return signed up user information.

TODO: When the user signed in, email will be sent to the user. The email contains a link to verify the user.
TODO: Every day, check unverified users and delete them.

#### /sign-up-email

TODO: Check database if the email is already verified. If it is, return `true`. If not, return `false`.
TODO: Sign up email function. It will send an email to the user. The email contains a link to verify the user.

#### /reset-password

TODO: Reset password function. It will send an email to reset password
TODO: Only send an email if the user is verified

#### /verify

Verify function. It will return user information if the token is valid.

#### /refresh-token

TODO: Refresh token function. It will return a new JWT token. New refresh token is stored in a cookie.
