package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/hello")
public class HelloWorldServlet extends HttpServlet {

  ArrayList<String> messages = new ArrayList<String>(Arrays.asList("I am from NYC", "I have a pet cat and bird", "AoT fan"));

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Convert messages to JSON
    Gson gson = new Gson();
    String json = gson.toJson(messages);

    response.setContentType("text/html;");
    response.getWriter().println(json);
  }
}
