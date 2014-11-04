var target : Transform;
var distance = 10.0;

var xSpeed = 250.0;
var ySpeed = 120.0;
var zSpeed = 180.0;

var yMinLimit = -20;
var yMaxLimit = 80;

var zMinLimit = 5;
var zMaxLimit = 20;

var OrbitKey : KeyCode = KeyCode.Mouse0;

private var x = 0.0;
private var y = 0.0;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;

	// Make the rigid body not change rotation
   	if (GetComponent.<Rigidbody>())
		GetComponent.<Rigidbody>().freezeRotation = true;
}

function LateUpdate(){
	if (target) {
		if (Input.GetKey(OrbitKey)){
       		x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
        	y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
 			y = ClampAngle(y, yMinLimit, yMaxLimit);      
 		}
 		
 		distance = Mathf.Clamp(distance - (Input.GetAxis("Mouse ScrollWheel") * zSpeed * 0.02), zMinLimit, zMaxLimit);
 		
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
        transform.rotation = rotation;
        transform.position = position;
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}