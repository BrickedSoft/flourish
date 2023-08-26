package com.brickedsoft.flourishApi;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.brickedsoft.flourishApi.models.ApplicationUser;
import com.brickedsoft.flourishApi.models.Role;
import com.brickedsoft.flourishApi.repositories.RoleRepository;
import com.brickedsoft.flourishApi.repositories.UserRepository;

@SpringBootApplication
public class FlourishApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(FlourishApiApplication.class, args);
  }

  @Bean
  CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {

      if (roleRepository.findByAuthority("ADMIN").isPresent())
        return;
        
      Role adminRole = roleRepository.save(new Role("ADMIN"));

      roleRepository.save(new Role("USER"));

      // Set<Role> roles = new HashSet<>();
      // roles.add(adminRole);

      // ApplicationUser admin = new ApplicationUser(1, "admin", passwordEncoder.encode("password"), roles);

      // userRepository.save(admin);

    };
  }
}
