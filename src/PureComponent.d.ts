import Component from "./Component";

declare abstract class PureComponent<P = {}, S = {}> extends Component<P, S> {}

export = PureComponent;
