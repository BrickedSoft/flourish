package com.brickedsoft.flourishApi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickedsoft.flourishApi.dtos.LoginResponseDTO;
import com.brickedsoft.flourishApi.dtos.RegistrationDTO;
import com.brickedsoft.flourishApi.models.ApplicationUser;
import com.brickedsoft.flourishApi.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/register/user")
  public ApplicationUser registerUser(@RequestBody RegistrationDTO registrationDTO) {
    return authenticationService.register(registrationDTO.getUsername(),
        registrationDTO.getPassword(), "USER");
  }

  @PostMapping("/register/admin")
  public ApplicationUser registerAdmin(@RequestBody RegistrationDTO registrationDTO) {
    return authenticationService.register(registrationDTO.getUsername(),
        registrationDTO.getPassword(), "ADMIN");
  }

  @PostMapping("/login")
  public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
    return authenticationService.login(body.getUsername(), body.getPassword());
  }
}
