package com.brickedsoft.flourishApi.services;

import java.util.HashSet;
import java.util.Set;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brickedsoft.flourishApi.dtos.LoginResponseDTO;
import com.brickedsoft.flourishApi.models.ApplicationUser;
import com.brickedsoft.flourishApi.models.Role;
import com.brickedsoft.flourishApi.repositories.RoleRepository;
import com.brickedsoft.flourishApi.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthenticationService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenService tokenService;

  public ApplicationUser register(String username, String password, String roleName) {
    String encodedPassword = passwordEncoder.encode(password);

    Role role = roleRepository.findByAuthority(roleName).get();

    Set<Role> authorities = new HashSet<>();
    authorities.add(role);

    return userRepository.save(new ApplicationUser(0, username, encodedPassword, authorities));

  }

  public LoginResponseDTO login(String username, String password) {
    Authentication auth = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(username, password)
    );

    String token = tokenService.genertateJwt(auth);

    return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
  }


}
