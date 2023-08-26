package com.brickedsoft.flourishApi.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegistrationDTO {
  private String username;
  private String password;

  public String toString(){
    return "Registration info: user: "+ this.username + " password " + this.password;
  }
}
