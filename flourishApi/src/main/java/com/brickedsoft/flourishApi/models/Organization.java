package com.brickedsoft.flourishApi.models;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "organizations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Organization {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "organization_id")
  private Integer organizationId;

  private String name;

  private String loaction;

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
  @JoinTable(name = "user_organization_junction", joinColumns = { @JoinColumn(name = "organization_id") }, inverseJoinColumns = {
      @JoinColumn(name = "user_id") })
  private Set<Role> members;

}
