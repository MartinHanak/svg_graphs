
import {SvgGraph, SvgRect, FilledSvgRect} from './svg_classes.js';


// new svg element
const svg_graph_1 = new SvgGraph('svg-graph-1');
svg_graph_1.render();

const test_data = [60,40,50,32,43,34,53,34];
svg_graph_1.render_histogram(test_data,{dx:10.0,center_bars:true});

const svg_graph_2 = new SvgGraph('svg-graph-2');
svg_graph_2.render();


svg_graph_1.render_background('rgba(0,0,0,0.2)');
svg_graph_1.render_axis(0,10,"x","y");

// hover event for all svgs
/*
const svgs = document.querySelectorAll('svg');
svgs.forEach(svg => svg.addEventListener('click', (e) => {
    console.log("hello");
    console.log(e.clientX);
}));
*/

// axis
//function render_axis();
const ns = "http://www.w3.org/2000/svg"
const axis = new SvgRect(svg_graph_1.id,0,0,10,10,"red");
axis.render();



const rect = document.createElementNS(ns,"rect");
rect.setAttribute('x',20);
rect.setAttribute('y',20);
rect.setAttribute('width',20);
rect.setAttribute('height',20);
rect.setAttribute('fill','rgba(255,255,0,0.5)');

document.getElementById(svg_graph_1.id).appendChild(rect);
