<?php

$users = [
	array(
		'name' 	=> 'Jackie',
		'age' 	=> 32
	),
	array(
		'name' 	=> 'Vivian',
		'age'  	=> '38'
	)
];

$response = [
	'status' => 'ok',
	'users'  => $users
];

header("Content-type: application/json");
echo json_encode($response);

?>