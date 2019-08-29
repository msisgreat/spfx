import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Msisgreat.module.scss';
import * as $ from 'jquery';
require('tooltipster');
import { sp, ItemAddResult } from "@pnp/sp";

require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
require('../../../../node_modules/tooltipster/dist/css/tooltipster.bundle.min.css');
require('../../../../node_modules/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-punk.min.css');

interface MyProps {

}
interface MyState {
    ExcellentComment: string;
    MediumComment: string;
    PoorComment: string;
    MyEmail: string;
}

export default class Feedback extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            ExcellentComment: "",
            MediumComment: "",
            PoorComment: "",
            MyEmail: ''
        };
    }
    private $node;
    private $ttInstance;
    /*private $ttNode1;
    private $ttNode2;
    private $ttNode3;*/

    private hideStyle = {
        display: 'none'
    };
    private btnSubmitStyle = {
        cursor: 'pointer'
    };
    private icoPoorStyle = {
        color: 'red'
    };
    private icoMediumStyle = {
        color: 'orange'
    };
    private icoExcellentStyle = {
        color: 'green'
    };
    protected handleExcellentChanged(event) {
        this.setState({ ExcellentComment: event.target.value });
    }
    protected handleMediumChanged(event) {
        this.setState({ MediumComment: event.target.value });
    }
    protected handlePoorChanged(event) {
        this.setState({ PoorComment: event.target.value });
    }

    public componentDidMount() {
        this.$node = $(this.refs.ttContainer);
        this.$ttInstance = this.$node.children().tooltipster({
            animation: 'grow',
            delay: 200,
            theme: 'tooltipster-punk',
            trigger: 'click',
            maxWidth: 350,
            minWidth: 300,
            interactive: true
        });

        sp.web.currentUser.get().then((user) => {
            this.setState({ MyEmail: user.Email });
            console.log(user);
        });
    }
    protected addExcellentComment = (event) => {
        console.log(this.state.ExcellentComment);
        sp.web.lists.getByTitle("Feedbacks").items.add({
            Comment: this.state.ExcellentComment,
            FeedbackType: "Excellent",
            Title: this.state.MyEmail,
        }).then((iar: ItemAddResult) => {
            console.log(iar);
        });
        $(this.refs.ttFeedback1).trigger("click"); // to close
        this.setState({ ExcellentComment: "" });
        event.preventDefault();
    }
    protected addMediumComment = () => {
        console.log(this.state.MediumComment);
        sp.web.lists.getByTitle("Feedbacks").items.add({
            Comment: this.state.MediumComment,
            FeedbackType: "Average",
            Title: this.state.MyEmail,
        }).then((iar: ItemAddResult) => {
            console.log(iar);
        });
        $(this.refs.ttFeedback2).trigger("click"); // to close
        this.setState({ MediumComment: "" });
        event.preventDefault();
    }
    protected addPoorComment = () => {
        console.log(this.state.PoorComment);
        sp.web.lists.getByTitle("Feedbacks").items.add({
            Comment: this.state.PoorComment,
            FeedbackType: "Poor",
            Title: this.state.MyEmail,
        }).then((iar: ItemAddResult) => {
            console.log(iar);
        });
        $(this.refs.ttFeedback3).trigger("click"); // to close
        this.setState({ PoorComment: "" });
        event.preventDefault();
    }

    public render() {
        return (<div>
            <ul className="nav justify-content-center" ref="ttContainer">
                <li ref="ttFeedback1" data-tooltip-content="#tooltip_content1" className="nav-item"><a className="nav-link tt-tip" href="#"><i style={this.icoExcellentStyle} className="fas fa-grin-hearts fa-2x"></i></a></li>
                <li ref="ttFeedback2" data-tooltip-content="#tooltip_content2" className="nav-item"><a className="nav-link tt-tip" href="#"><i style={this.icoMediumStyle} className="fas fa-grin-hearts fa-2x icoMedium"></i></a></li>
                <li ref="ttFeedback3" data-tooltip-content="#tooltip_content3" className="nav-item"><a className="nav-link tt-tip" href="#"><i style={this.icoPoorStyle} className="fas fa-grin-beam-sweat fa-2x icoPoor"></i></a></li>
            </ul>
            <div style={this.hideStyle} className={styles.tooltipTemplates}>
                <div id="tooltip_content1">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="comment1">Comment:</label>
                                <textarea value={this.state.ExcellentComment} onChange={(event) => this.handleExcellentChanged(event)} ref="comment1Ref" className="form-control" rows={5} id="comment1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-right">
                            <div style={this.btnSubmitStyle} onClick={this.addExcellentComment} className="btnSubmit btnHappy btn btn-success">Submit</div>
                        </div>
                    </div>
                </div>

                <div id="tooltip_content2">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="comment2">Comment:</label>
                                <textarea value={this.state.MediumComment} onChange={(event) => this.handleMediumChanged(event)} className="form-control" rows={5} id="comment2" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-right">
                            <div style={this.btnSubmitStyle} onClick={this.addMediumComment} className="btnSubmit btnMedium btn btn-warning">Submit</div>
                        </div>
                    </div>
                </div>
                <div id="tooltip_content3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="comment3">Comment:</label>
                                <textarea value={this.state.PoorComment} onChange={(event) => this.handlePoorChanged(event)} className="form-control" rows={5} id="comment3" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-right">
                            <div style={this.btnSubmitStyle} onClick={this.addPoorComment} className="btnSubmit btn btn-danger">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}