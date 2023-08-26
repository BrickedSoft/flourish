package com.brickedsoft.flourishApi.dtos;

import com.brickedsoft.flourishApi.models.ApplicationUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
  private ApplicationUser user;
  private String jwt;


}
