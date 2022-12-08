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

# Iterate over time and simulate the arm by adding the force vectors to the current position vector directly (as in incorrect physics) but geometrically correct (with respect to trigonometry) and send an HTTP request with the current state after each iteration.

# define timestep and total number of iterations
timestep = 0.1
num_iter = 1000

# iterate over time
for i in range(num_iter):

	# calculate current position vector
	current_position = current_position + arm_controller(current_position, final_position)*timestep

	# send an HTTP request with the current state
	send_http_request(current_position)


# Write a flask server that handles that request and stores each result to a file.

# import Flask
from flask import Flask

# create Flask app
app = Flask(__name__)

# route for handling requests
@app.route("/arm_control", methods=['POST'])
def handle_request():
	# get request data
	data = request.get_json()

	# store data to file
	with open('arm_data.txt', 'a') as file:
		file.write(str(data) + "\n")

	# return success response
	return jsonify({'status': 'success'}), 200

# run Flask app
if __name__ == "__main__":
	app.run(debug=True)

#  Write a python script that loads the data saved in that file and renders it to a png and then generates a gif animation from those pngs

# import necessary packages
import matplotlib.pyplot as plt
import imageio

# define list to store arm data
data = []

# load arm data from file
with open('arm_data.txt') as file:
	for line in file:
		data.append(line)

# iterate through arm data
for i, d in enumerate(data):
	# extract x, y, and z coordinates
	x = d[0]
	y = d[1]
	z = d[2]

	# create plot
	plt.plot(x, y, z, marker='.')

	# save plot to file
	plt.savefig('arm_' + str(i) + '.png')

# create list of images
images = []

# iterate through arm data
for i in range(len(data)):
	# add image to list of images
	images.append(imageio.imread('arm_' + str(i) + '.png'))

# save images as gif
imageio.mimsave('arm.gif', images)