const modelParams = {
  flipHorizontal: false,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.5,    // confidence threshold for predictions.
}

navigator.getUserMedia= navigator.getUserMedia||
navigator.webkitGetUserMedia||
navigator.mozGetUserMedia||
navigator.msGetUserMedia;


const video= document.querySelector('#video');
const canvas= document.querySelector('#canvas');
const context=canvas.getContext('2d');
let model;

function play(y,x){
	context.lineWidth=2;
	context.lineCap="round";
	context.lineTo(y,x);
	context.stroke();
}

handTrack.startVideo(video)
.then(status => {
	if(status){
		navigator.getUserMedia({video: {}}, 
		stream=>{
			video.srcObject=stream;
			setInterval(runDetectin, 100);
		},
		err=>consolo.log(err)
	);
	}
});

function runDetectin(){
	model.detect(video)
		.then(predictions => {
			
			// model.renderPredictions(predictions,  canvas,   context,  video);
			// context.beginPath();
			if(predictions.length>0){
				let y = (predictions[0].bbox[0]/2+predictions[0].bbox[2]/4);
				let x = (predictions[0].bbox[1]/3+predictions[0].bbox[3]/6);
				play(y,x);
				context.beginPath();
			}else{
				context.beginPath();
			}
			for(let i=0;i<predictions.length;i++){
				context.beginPath();
				let y = (predictions[i].bbox[0]/2+predictions[i].bbox[2]/4);
				let x = (predictions[i].bbox[1]/3+predictions[i].bbox[3]/6);
				play(y,x);
			}
			
		});

} 


handTrack.load(modelParams).then(lmodel =>{
	model = lmodel;
}); 