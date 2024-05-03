import { NextResponse } from "next/server";

class ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  body: T;

  constructor(success: boolean, message: string, status: number, body: T) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.body = body;
  }
}

export class SuccessApiResponse<T> extends ApiResponse<T> {
  super(success: boolean, message: string, status: number, body: T) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.body = body;
  }

  static send<T>(message: string = "OK", status: number = 200, body?: T) {
    return NextResponse.json(
      new SuccessApiResponse(true, message, status, body),
      {
        status: status,
      }
    );
  }
}

export class ErrorApiResponse<T> extends ApiResponse<T> {
  super(success: boolean, message: string, status: number, body: T) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.body = body;
  }

  static send<T>(message: string = "NOT OK", status: number = 400, body?: T) {
    return NextResponse.json(
      new SuccessApiResponse(false, message, status, body),
      {
        status: status,
      }
    );
  }
}
