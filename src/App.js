import React,{Component} from 'react';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
	accessKeyId: process.env.REACT_APP_api_key,        
	secretAccessKey:process.env.REACT_APP_api_secrete_key,  
	Bucket: process.env.REACT_APP_bucket_name,       
	signatureVersion: 'v4',
	region: 'ap-south-1'     
 });

 
class App extends Component {
	state = {	selectedFile: null	};
	
	onFileUpload = event => {
	this.setState({ selectedFile: event.target.files[0] });	
	};
	
	onFileSend = () => {
	const formData = new FormData();
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
		const params = {
			   Bucket: 'YOUR BUCKET NAME', 
			   Key: this.state.selectedFile.name, 
			   Body: this.state.selectedFile
		      };
       
		s3.upload(params, function(s3Err, data) {
			   if (s3Err) throw s3Err
			   alert(`File uploaded successfully at ${data.Location}`)
		   });
	};
	
	fileDetails = () => {
	if (this.state.selectedFile) {
		return (
		<div>
			<h2>File Details:</h2>
<p>File Name: {this.state.selectedFile.name}</p>
<p>File Type: {this.state.selectedFile.type}</p>
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>
		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose file before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	render() {
	return (
		<div>		
			<h3>
			File Upload to S3 using React !!!
			</h3>
			<div>
				<input type="file" onChange={this.onFileUpload} />
				<button onClick={this.onFileSend}>
				Upload to S3!
				</button>
			</div>
		{this.fileDetails()}
		</div>
	);
	}
}
export default App;
