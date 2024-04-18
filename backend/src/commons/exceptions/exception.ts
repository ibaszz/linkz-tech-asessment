class Exception extends Error {
  code: string;

  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static unauthorized(username) {
    return new Exception('USR-001', `User: ${username} is Unauthorized`);
  }

  static userPasswordWrong() {
    return new Exception('USR-002', `User / Password is Wrong`);
  }

  static cannotSigninWithThisMethod() {
    return new Exception(
      'USR-003',
      `Cannot Sign in with this method, please use another instead`,
    );
  }

  static userIsDeleted() {
    return new Exception(
      'USR-004',
      `User Already Deleted, Please Contact Admin`,
    );
  }

  static userAlreadyRegistered(username) {
    return new Exception('USR-005', `User: ${username} is Already Registered`);
  }
}

export default Exception;
