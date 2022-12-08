# Python
# This program calculates the position of a cartesian gantry robotic arm and uses inverse kinematics to solve for the actuator drive strengths needed at the moment to arrive at the final position in a smooth way

# This is a function that takes a 3d vector for the current position and a 3d vector for the final position and returns a 3d vector representing the force vector of the 3 orthogonal actuators.  
def inverse_kinematics(current_position, final_position):
    # Calculate the differences between the current and final position
    x_difference = final_position[0] - current_position[0]
    y_difference = final_position[1] - current_position[1]
    z_difference = final_position[2] - current_position[2]

    # Calculate the force vectors
    x_force = x_difference / (abs(x_difference) + abs(y_difference) + abs(z_difference))
    y_force = y_difference / (abs(x_difference) + abs(y_difference) + abs(z_difference))
    z_force = z_difference / (abs(x_difference) + abs(y_difference) + abs(z_difference))

    # Return the force vector
    return [x_force, y_force, z_force]

# Test the function
print(inverse_kinematics([0, 0, 0], [2, 3, 4])) #