import "./ConditionCard.css";

export interface ConditionCardProps {
    display_symbol: string;
    display_text?: string;
    satisfication_state: "blank" | "satisfied" | "unsatisfied";
    key?: any;
}

export default function ConditionCard(props: ConditionCardProps) {
    return (
        <>
            <div className={`condition-card ${props.satisfication_state}`}>
                <h3>{props.display_symbol}</h3>
                {props.display_text}
            </div>
        </>
    )
}