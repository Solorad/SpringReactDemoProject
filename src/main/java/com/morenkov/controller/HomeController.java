package com.morenkov.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author emorenkov
 */
@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}