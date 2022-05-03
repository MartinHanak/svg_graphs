class SvgGraph {
    constructor(id) {
        this.id = id;
        this.axis_padding_top = 5;
        this.axis_padding_bot = 5;
        this.axis_padding_left = 5;
        this.axis_padding_right = 5;
        this.axis_width = 1;
        this.width = 150; // native SVG width and height
        this.height = 100;
        this.ns = "http://www.w3.org/2000/svg";

        this.innerX = this.axis_padding_left + this.axis_width;
        this.innerY = this.axis_padding_top + this.axis_width;
        this.innerWidth = this.width - (this.axis_padding_left + 2*this.axis_width + this.axis_padding_right);
        this.innerHeight = this.height - (this.axis_padding_top + 2*this.axis_width + this.axis_padding_bot);
    }
    // x and y dimension inside axis and starting x and y position for the inner box
    getInnerBox() {
        const innerBox = {
            x: this.axis_padding_left + this.axis_width,
            y: this.axis_padding_top + this.axis_width,
            width: this.width - (this.axis_padding_left + 2*this.axis_width + this.axis_padding_right),
            height: this.height - (this.axis_padding_top + 2*this.axis_width + this.axis_padding_bot),
        };
        return innerBox;
    }
    render() {
        let svg = document.createElementNS(this.ns, "svg");
        svg.setAttribute('id',this.id);
        svg.setAttribute('viewBox',`0 0 ${this.width} ${this.height}`);
        document.body.appendChild(svg);
        // event listener to console log cursor position
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
        background_rect.setAttribute('width',this.width);
        background_rect.setAttribute('height',this.height);
        background_rect.setAttribute('fill',color);
        document.getElementById(this.id).appendChild(background_rect);
    }
    render_axis(min,max,x_label,y_label) {
        const axis_rect = document.createElementNS(this.ns,"rect");
        // stroke is rendered out and in, half of axis width needs to be subtracted
        axis_rect.setAttribute('x',this.axis_padding_left + this.axis_width/2);
        axis_rect.setAttribute('y',this.axis_padding_top + this.axis_width/2);
        // only one axis width needs to be subtracted here
        const axis_rect_width = this.width - this.axis_padding_left - this.axis_padding_right - this.axis_width;
        axis_rect.setAttribute('width',axis_rect_width);
        const axis_rect_height = this.height - this.axis_padding_top - this.axis_padding_bot - this.axis_width;
        axis_rect.setAttribute('height',axis_rect_height);
        axis_rect.setAttribute('fill','none');
        axis_rect.setAttribute('stroke','black');
        axis_rect.setAttribute('stroke-width',this.axis_width);
        document.getElementById(this.id).appendChild(axis_rect);
        

        const y_tick_values = this.generate_y_tick_values();
        const x_tick_values = this.generate_x_tick_values();

        // render y ticks
        let index = 0;
        for (const y_tick_value of y_tick_values) {
            let test_tick_value = document.createElementNS(this.ns,"text");
            test_tick_value.textContent = y_tick_value;
            test_tick_value.setAttribute('class','axis_tick_values');
            test_tick_value.setAttribute('font-size',2.5);
            document.getElementById(this.id).appendChild(test_tick_value);
            // x and y of the text start at the bottom right corner
            test_tick_value.setAttribute('text-anchor','end');
            test_tick_value.setAttribute('x',this.axis_padding_left-0.2);
            // position of the botton tick
            test_tick_value.setAttribute('y',this.axis_padding_top  + axis_rect_height + test_tick_value.getBBox().height/2);
            test_tick_value.setAttribute('dy',- index * (axis_rect_height - this.axis_width)/(y_tick_values.length-1));
            index += 1;
        }
         // render x ticks
         index = 0;
         for (const x_tick_value of x_tick_values) {
             let test_tick_value = document.createElementNS(this.ns,"text");
             test_tick_value.textContent = x_tick_value;
             test_tick_value.setAttribute('class','axis_tick_values');
             test_tick_value.setAttribute('font-size',2.5);
             document.getElementById(this.id).appendChild(test_tick_value);
             // x and y of the text start at the center
             test_tick_value.setAttribute('text-anchor','middle');
             test_tick_value.setAttribute('x',this.axis_padding_left + this.axis_width);
             // position of the botton tick
             test_tick_value.setAttribute('y',this.axis_padding_top + axis_rect_height + this.axis_width + test_tick_value.getBBox().height );
             test_tick_value.setAttribute('dx', index * (axis_rect_width - this.axis_width)/(x_tick_values.length-1));
             index += 1;
         }


/*
        // tick values
        // test - one tick value
        let test_tick_value = document.createElementNS(this.ns,"text");
        test_tick_value.textContent ="3.9";
        test_tick_value.setAttribute('class','axis_tick_values');
        test_tick_value.setAttribute('font-size',2.5);
        document.getElementById(this.id).appendChild(test_tick_value);
        // x and y of the text start at the bottom right corner
        test_tick_value.setAttribute('text-anchor','end');
        test_tick_value.setAttribute('x',this.axis_padding_left-0.2);
        // position of the botton tick
        test_tick_value.setAttribute('y',this.axis_padding_top  + axis_rect_height);
        //test_tick_value.setAttribute("textContent","9.0")
        console.log(test_tick_value.getBBox().height);
        */

        // second tick value

        // second tick


        // call render grid
        this.render_grid();

        // ticks    
        this.render_ticks();
    

        //legend ?
    }
    // grid
    render_grid () {
        // test innterBox
        let test_inner_box = document.createElementNS(this.ns,"rect");
        test_inner_box.setAttribute('x',this.innerX);
        test_inner_box.setAttribute('y',this.innerY);
        test_inner_box.setAttribute('width',this.innerWidth);
        test_inner_box.setAttribute('height',this.innerHeight);
        test_inner_box.setAttribute('fill',"green");
        document.getElementById(this.id).appendChild(test_inner_box);

        // test line
        const strokeWidth = this.axis_width/5;
        const strokeColor = "rgb(105,105,105)";
        //const strokeDashArray = "2 1";
        const split = 5;
        for(let i = 1; i < split; i++) {
            let test_line = document.createElementNS(this.ns,"line");
            test_line.setAttribute('x1',this.innerX + this.innerWidth/split*i);
            test_line.setAttribute('x2',this.innerX + this.innerWidth/split*i);
            test_line.setAttribute('y1',this.innerY );
            test_line.setAttribute('y2',this.innerY + this.innerHeight);
            test_line.setAttribute('stroke',strokeColor);
            test_line.setAttribute('stroke-width',strokeWidth);
            //test_line.setAttribute('stroke-dasharray',strokeDashArray);
            document.getElementById(this.id).appendChild(test_line);
        }
        const split_y = 5;
        for(let i = 1; i < split_y; i++) {
            let test_line = document.createElementNS(this.ns,"line");
            test_line.setAttribute('x1',this.innerX);
            test_line.setAttribute('x2',this.innerX + this.innerWidth);
            test_line.setAttribute('y1',this.innerY + this.innerHeight/split_y*i);
            test_line.setAttribute('y2',this.innerY + this.innerHeight/split_y*i);
            test_line.setAttribute('stroke',strokeColor);
            test_line.setAttribute('stroke-width',strokeWidth);
            //test_line.setAttribute('stroke-dasharray',strokeDashArray);
            document.getElementById(this.id).appendChild(test_line);
        }

    }

    render_ticks() {
         // test line
         const stroke_width = this.axis_width/5;
         const stroke_color = "black";
         const tick_length = this.axis_width*2;
         //const strokeDashArray = "2 1";
         const split = 5;
         for(let i = 1; i < split; i++) {
             let test_line = document.createElementNS(this.ns,"line");
             test_line.setAttribute('x1',this.innerX + this.innerWidth/split*i);
             test_line.setAttribute('x2',this.innerX + this.innerWidth/split*i);
             test_line.setAttribute('y1',this.innerY );
             test_line.setAttribute('y2',this.innerY + tick_length);
             test_line.setAttribute('stroke',stroke_color);
             test_line.setAttribute('stroke-width',stroke_width);
             //test_line.setAttribute('stroke-dasharray',strokeDashArray);
             document.getElementById(this.id).appendChild(test_line);

             test_line = document.createElementNS(this.ns,"line");
             test_line.setAttribute('x1',this.innerX + this.innerWidth/split*i);
             test_line.setAttribute('x2',this.innerX + this.innerWidth/split*i);
             test_line.setAttribute('y1',this.innerY +  this.innerHeight - tick_length);
             test_line.setAttribute('y2',this.innerY + this.innerHeight);
             test_line.setAttribute('stroke',stroke_color);
             test_line.setAttribute('stroke-width',stroke_width);
             //test_line.setAttribute('stroke-dasharray',strokeDashArray);
             document.getElementById(this.id).appendChild(test_line);
         }
         const split_y = 5;
         for(let i = 1; i < split_y; i++) {
             let test_line = document.createElementNS(this.ns,"line");
             test_line.setAttribute('x1',this.innerX);
             test_line.setAttribute('x2',this.innerX + tick_length);
             test_line.setAttribute('y1',this.innerY + this.innerHeight/split_y*i);
             test_line.setAttribute('y2',this.innerY + this.innerHeight/split_y*i);
             test_line.setAttribute('stroke',stroke_color);
             test_line.setAttribute('stroke-width',stroke_width);
             //test_line.setAttribute('stroke-dasharray',strokeDashArray);
             document.getElementById(this.id).appendChild(test_line);

             test_line = document.createElementNS(this.ns,"line");
             test_line.setAttribute('x1',this.innerX + this.innerWidth - tick_length);
             test_line.setAttribute('x2',this.innerX + this.innerWidth);
             test_line.setAttribute('y1',this.innerY + this.innerHeight/split_y*i);
             test_line.setAttribute('y2',this.innerY + this.innerHeight/split_y*i);
             test_line.setAttribute('stroke',stroke_color);
             test_line.setAttribute('stroke-width',stroke_width);
             //test_line.setAttribute('stroke-dasharray',strokeDashArray);
             document.getElementById(this.id).appendChild(test_line);
         }
    }

    generate_x_tick_values() {
        return ["0","2","4","6","8","10"];
    }
    generate_y_tick_values() {
        return ["0","2.0","4.0","6.0","8.0","10.0"];
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