package com.brickedsoft.flourishApi.utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class RsaKeyProperties {
  private RSAPublicKey publicKey;
  private RSAPrivateKey privateKey;

  public RsaKeyProperties(){
    KeyPair pair = KeyGeneratorUtility.generateRsaKey();
    this.publicKey = (RSAPublicKey) pair.getPublic();
    this.privateKey = (RSAPrivateKey) pair.getPrivate();
  }
}
