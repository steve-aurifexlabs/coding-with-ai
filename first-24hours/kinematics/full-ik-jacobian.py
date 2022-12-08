# Python
# Write a python function for controlling a 3-axis articulated robotic arm where all three axes are co-planar and mounted on a single axis rotational actuator that can move a full 360 degrees and uses inverse kinematics to solve for the actuator drive strengths needed at the moment to arrive at the final position in a smooth way. The orientation of the end of the arm doesn't matter. Using numpy, it should take a 3d vector for the current position and a 3d vector for the final position and returns a 4d vector representing the force vector of the 4 actuators.

# import numpy for linear algebra
import numpy as np

# define function for 3-axis articulated robotic arm
def arm_controller(current_position, final_position):
	
	# calculate inverse kinematics to solve for the actuator drive strengths
	# using inverse kinematics equation: F = inv(J) * (Xd - X)
	# where F is the force vector of the 4 actuators, J is the Jacobian, Xd is the final position, and X is the current position
	F = np.linalg.inv(J) * (final_position - current_position)
	
	# return force vector of 4 actuators
	return F

# Define J, the jacobian for the robot described above in terms of angles and lengths of links
# J = [[l1*cos(theta1), l2*cos(theta2), l3*cos(theta3)], 
#      [l1*sin(theta1), l2*sin(theta2), l3*sin(theta3)], 
#      [1, 1, 1]]

# set values for lengths of links
l1 = 3
l2 = 2
l3 = 1

# set values for angles of links
theta1 = np.pi/4
theta2 = np.pi/3
theta3 = np.pi/2

# calculate J
J = [[l1*np.cos(theta1), l2*np.cos(theta2), l3*np.cos(theta3)], 
     [l1*np.sin(theta1), l2*np.sin(theta2), l3*np.sin(theta3)], 
     [1, 1, 1]]

# example of current and final position vectors
current_position = np.array([1, 2, 3])
final_position = np.array([4, 5, 6])

# call arm_controller function
print("Force vector of 4 actuators: ", arm_controller(current_position, final_position))