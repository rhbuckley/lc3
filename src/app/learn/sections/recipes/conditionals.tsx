import { Code, Heading } from "~/components/DocComponents";

const conditions = [
    {
        logical: "if (a < b)",
        numeric: "if (a - b < 0)",
        branch: "BRn",
        negatedBranch: "BRzp",
    },
    {
        logical: "if (a <= b)",
        numeric: "if (a - b <= 0)",
        branch: "BRnz",
        negatedBranch: "BRp",
    },
    {
        logical: "if (a > b)",
        numeric: "if (a - b > 0)",
        branch: "BRp",
        negatedBranch: "BRnz",
    },
    {
        logical: "if (a >= b)",
        numeric: "if (a - b >= 0)",
        branch: "BRzp",
        negatedBranch: "BRn",
    },
    {
        logical: "if (a == b)",
        numeric: "if (a - b == 0)",
        branch: "BRz",
        negatedBranch: "BRnp",
    },
    {
        logical: "if (a != b)",
        numeric: "if (a - b != 0)",
        branch: "BRnp",
        negatedBranch: "BRz",
    },
    {
        logical: "if (a)",
        numeric: "if (a != 0)",
        branch: "BRnp",
        negatedBranch: "BRz",
    },
    {
        logical: "if (!a)",
        numeric: "if (a == 0)",
        branch: "BRz",
        negatedBranch: "BRnp",
    },
];

export function LC3Conditionals() {
    return (
        <>
            <Heading level={3}>Conditionals</Heading>
            <p>
                Conditionals, such as <Code>if</Code> statments do not exist in
                LC-3, but we can make these statements work by using the{" "}
                <Code>BR</Code> instruction. For example, see the following
                equivalencies.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Logical</th>
                        <th>Numeric</th>
                        <th>LC-3 Branch</th>
                        <th>Negated LC-3 Branch</th>
                    </tr>
                </thead>

                <tbody>
                    {conditions.map((condition, i) => (
                        <tr key={i}>
                            <td>
                                <Code>{condition.logical}</Code>
                            </td>
                            <td>
                                <Code>{condition.numeric}</Code>
                            </td>
                            <td>{condition.branch}</td>
                            <td>{condition.negatedBranch}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>
                To learn more about this, please check out{" "}
                <a
                    href="https://www.cs.colostate.edu/~fsieker/misc/CtoLC3.html"
                    target="_blank"
                    className="text-blue-600 underline"
                >
                    this
                </a>{" "}
                website by Colorado State University, as it is very informative.
            </p>
        </>
    );
}
