class PageController extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
            </div>
        )
    }

}