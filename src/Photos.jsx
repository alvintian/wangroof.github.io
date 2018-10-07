import React, { Component } from 'react';
//import Photo from './Photo.jsx';
import Gallery from 'react-grid-gallery';
import $ from 'jquery';
// var images =
// [{
//         src: "/images/file-1537247126746.jpeg",
//         thumbnail: "/images/file-1537247126746.jpeg",
// }]
class Photos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: "",
            currentImage: 0
        };
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
		this.fd = new FormData();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
}
    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    deleteImage() {
    	console.log('pre delete test');
  //   	fetch('/api/Photos/:id', {
		// 	method: 'DELETE',
		// })
		// .then(response => response.json());
 			$.ajax({
			url: '/api/Photos',
			method: 'delete',
			data: {
			name: this.props.admin[this.state.currentImage].src
			}});

		console.log(this.props.admin[this.state.currentImage].src,'after delete test');

        // if (window.confirm(`Are you sure you want to delete image number ${this.state.currentImage}?`)) {
        //     var images = this.state.images.slice();
        //     console.log(this.state.images,"before delete confirm")
        //     images.splice(this.state.currentImage, 1)
        //     this.setState({
        //         images: images
        //     });
        //     console.log(this.state.images,"after delete confirm")
        // }
    }


	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
	}

	handleUpload = e => {
		this.fd.append('file', e.target.files[0]);
		for (var key of this.fd.entries()) {
			console.log(key[0], "key 0",key[1], 'is the key there???');
		}

	};
	handleSubmit(event) {
		event.preventDefault();
//		this.fd.append('name', this.state.newName);
		fetch('/api/Photos', {
			method: 'POST',
			// 		headers: {
			// 	Accept: 'application/json',
			// 	'Content-Type': 'application/json',
			// },
			body: this.fd
		})
alert("Submitted");

	}

  // _getStaticImages() {
  //   let images = [];

  //   // for (let i = ; i < 12; i++) {
  //   //   images.push({
  //   //     original: `${PREFIX_URL}${i}.jpg`,
  //   //     thumbnail:`${PREFIX_URL}${i}t.jpg`
  //   //   });
  //   // }

  //   return images;
  // }

	render() {



	let content = this.props.admin;
	console.log(content);
//		console.log(images);
    var size = Object.keys(content).length;
console.log(size,"what is size??")
		return (
			<div>
		<h2 className="heading-font">Photo uploading place</h2>
				


{/*				{content.map(x => (
					<Photo
						photo={x}
						key={x.id}
					/>
				))}*/}

            <div style={{
            	margin:'auto',
                display: "block",
                minHeight: "1px",
                width: "80%",
                border: "1px solid #ddd",
                overflow: "auto"}}>
                <Gallery
                    images={this.props.admin}
                    enableLightbox={true}
                    enableImageSelection={false}
                    currentImageWillChange={this.onCurrentImageChange}
                    customControls={[
                        <button key="deleteImage" onClick={this.deleteImage}>Delete Image</button>
                    ]}
                />
            </div>

	<form 
	style={{clear:"both"}}
	onSubmit={this.handleSubmit}>
	<input
	type="file"
	name="photo"
	className="photo"
	onChange={this.handleUpload}
	/>
	<input
	type="submit"
	value="Submit"
	className="create-char-button"
	style={{ height: '40%', width: '40%' }}
	/>
				</form>
				</div>
		);
	}

}

export default Photos;