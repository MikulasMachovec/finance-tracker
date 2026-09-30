package org.example.financetracker.mapper;

import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateDTO;
import org.example.financetracker.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toResponse(UserEntity userEntity);

    void updateEntity(
            UserUpdateDTO userUpdateDTO,
            @MappingTarget UserEntity entity
    );

}
