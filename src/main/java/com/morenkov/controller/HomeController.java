package com.morenkov.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

/**
 * @author emorenkov
 */
@Controller
public class HomeController {
    private static final Logger log = LogManager.getLogger(HomeController.class);

    @RequestMapping(value = "*")
    public String index() {
        log.debug("In index method.");
        return "index";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }
}