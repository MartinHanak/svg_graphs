class SvgGraph {
    constructor(id) {
        this.id = id;
        this.axis_padding = 10;
        this.axis_width = 0.1;
        this.width = 100; // native SVG width and height
        this.height = 100;
        this.ns = "http://www.w3.org/2000/svg";
    }
    render() {
        let svg = document.createElementNS(this.ns, "svg");
        svg.setAttribute('id',this.id);
        svg.setAttribute('viewBox','0 0 100 100');
        document.body.appendChild(svg);
        svg.addEventListener('click', (e) => {
            const bound = svg.getBoundingClientRect();
            // position of mouse cursor relative to the svg in px
            let x = e.clientX - bound.left - svg.clientLeft;
            let y = e.clientY - bound.top - svg.clientTop;

            console.log("hello");
            console.log(`Position in px: ${x} and ${y}. `);
            console.log(`Width ${svg.clientWidth} and height ${svg.clientHeight}`);
            // position going from 0 to 100 by svg definition
            console.log(`SVG native position:`);
            console.log(` ${x/svg.clientWidth*this.width} and ${y/svg.clientHeight*this.height}`);
            console.log(`Fractional coordinates: `);
            console.log(`${x/svg.clientWidth} and ${y/svg.clientHeight}`);
        });
    }
    render_background(color) {
        const background_rect = document.createElementNS(this.ns,"rect");
        background_rect.setAttribute('x',0);
        background_rect.setAttribute('y',0);
        background_rect.setAttribute('width',100);
        background_rect.setAttribute('height',100);
        background_rect.setAttribute('fill',color);
        document.getElementById(this.id).appendChild(background_rect);
    }
    render_axis(min,max,x_label,y_label) {
        const axis_rect = document.createElementNS(this.ns,"rect");
        axis_rect.setAttribute('x',Math.round(this.axis_padding/2));
        axis_rect.setAttribute('y',Math.round(this.axis_padding/2));
        axis_rect.setAttribute('width',100 - this.axis_padding);
        axis_rect.setAttribute('height',100 - this.axis_padding);
        axis_rect.setAttribute('fill','none');
        axis_rect.setAttribute('stroke','black');
        axis_rect.setAttribute('stroke-width',this.axis_width);
        document.getElementById(this.id).appendChild(axis_rect);
    }
}

class SvgRect {
    constructor(svg_id,x,y,width,height,stroke) {
        this.svg_id = svg_id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.stroke = stroke;
        this.ns = "http://www.w3.org/2000/svg"
    }
    render() {
        const temp_rect = document.createElementNS(this.ns,"rect");
        temp_rect.setAttribute('x',this.x);
        temp_rect.setAttribute('y',this.y);
        temp_rect.setAttribute('width',this.width);
        temp_rect.setAttribute('height',this.height);
        temp_rect.setAttribute('stroke',this.stroke);
        temp_rect.setAttribute('stroke-width','4');
        temp_rect.setAttribute('fill','none');
        document.getElementById(this.svg_id).appendChild(temp_rect);
    }
}

class FilledSvgRect extends SvgRect {
    constructor(svg_element,x,y,width,height,fill) {

    }
}

export {SvgGraph, SvgRect, FilledSvgRect};