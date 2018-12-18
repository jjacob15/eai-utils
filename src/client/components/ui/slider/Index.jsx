import React, { Component } from "react";


class Index extends Component {
    constructor () {
        super()
        this.state = {
            slidervalue:0,
            slidertextvalue:0,
            minlimit:0,
            maxlimit:1,
            stepsize:0.05
        }
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.onSliderTextBlur = this.onSliderTextBlur.bind(this);
      }
    componentDidMount(){
        this.setState({
            slidervalue: this.props.entity.value,
            slidertextvalue: this.props.entity.value
        });
    }

    onSliderChange (e) {
        this.setState({slidervalue:e.target.value,slidertextvalue:e.target.value});
        this.props.onChange(this.props.entity.id, e.target.value);
    }
    onTextInputChange(e){
        const { minlimit,maxlimit } = this.state;
        var val = parseFloat(e.target.value);
        console.log(val);
        if(!isNaN(val)){
            if(parseFloat(val) >= minlimit && parseFloat(val) <= maxlimit){
                this.setState({slidervalue: parseFloat(val)});
                this.setState({slidertextvalue:e.target.value});
            }
            else{
                if(parseFloat(val) > maxlimit){
                    this.setState({slidervalue: maxlimit});
                    this.setState({slidertextvalue:maxlimit});
                }
            }
        }
        else{
            this.setState({slidervalue: minlimit});
            this.setState({slidertextvalue:minlimit});
        }
    }
    onSliderTextBlur(){
        const { minlimit,maxlimit } = this.state;
        var val = this.state.slidertextvalue;
        if(parseFloat(val) >= minlimit && parseFloat(val) <= maxlimit){
            this.setState({slidervalue: parseFloat(val)});
        }
        else{
            if(parseFloat(val) > maxlimit)
                this.setState({slidervalue: maxlimit});
        }
    }
      
    render() {
        const entity = this.props.entity;
        const { minlimit,maxlimit,stepsize } = this.state;
        const tooltip = "Value : " + this.state.slidervalue
        return (
            <div >
                <div className="row">
                    <div className="col-md-9">{entity.text}</div>
                    <div className="slider-text-field">
                        <input type="number" min={minlimit} max={maxlimit} step={stepsize} 
                        value={this.state.slidertextvalue} onChange={this.onTextInputChange}/>
                    </div>
                </div>
                <div className="slider-range" title={tooltip}>
                    <input type="range" value={this.state.slidervalue} min={minlimit} max={maxlimit} step={stepsize} 
                    onChange={this.onSliderChange}/>
                </div>
            </div>
        );
    }
}
export default Index;