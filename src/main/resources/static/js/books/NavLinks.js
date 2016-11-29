const React = require('react');

class NavLinks extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
    }

    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }
    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }
    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }
    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        return (
            <div className="row float-xs-right btn-group">
                <button key="first" className="btn btn-default" onClick={this.handleNavFirst} disabled={!("first" in this.props.links)}>&lt;&lt;</button>
                <button key="prev" className="btn btn-default" onClick={this.handleNavPrev} disabled={!("prev" in this.props.links)}>&lt;</button>
                <button key="next" className="btn btn-default" onClick={this.handleNavNext} disabled={!("next" in this.props.links)}>&gt;</button>
                <button key="last" className="btn btn-default" onClick={this.handleNavLast} disabled={!("last" in this.props.links)}>&gt;&gt;</button>
            </div>
        )
    }
}

export default NavLinks;