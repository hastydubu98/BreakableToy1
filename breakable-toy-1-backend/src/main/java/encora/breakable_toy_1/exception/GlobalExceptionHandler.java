package encora.breakable_toy_1.exception;

import encora.breakable_toy_1.controller.ProductController;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleAllExceptions(Exception ex) {
        return "An error occurred: " + ex.getMessage();
    }

    @ExceptionHandler(ProductController.ProductCreationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleProductCreationException(ProductController.ProductCreationException ex) {
        return ex.getMessage();
    }
}