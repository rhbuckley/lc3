import { Heading, Content, Section } from "~/components/DocComponents";
import type { SectionProps } from "..";

import AddInstruction from "./ADD";
import AndInstruction from "./AND";
import BRInstruction from "./BR";
import JRInstruction from "./JR";
import JSRInstruction from "./JSR";
import JSRRInstruction from "./JSRR";
import LDInstruction from "./LD";
import LDIInstruction from "./LDI";
import LDRInstruction from "./LDR";
import LEAInstruction from "./LEA";
import NOTInstruction from "./NOT";
import RETInstruction from "./RET";
import RTIInstruction from "./RTI";
import STInstruction from "./ST";
import STIInstruction from "./STI";
import STRInstruction from "./STR";
import TRAPInstruction from "./TRAP";

export default function OpcodesSection({ title, href }: SectionProps) {
    return (
        <Section>
            <Heading id={href} level={2}>
                {title}
            </Heading>
            <Content>
                <p className="text-black dark:text-white/80 bg-red-400/20 border-2 border-red-400 rounded-xl p-2">
                    There is a lot of information here. Instead of using this as
                    a reference, I would recommend ONE thorough read-through,
                    and then using the reference that is provided in the
                    simulator. Take notes. It will help (I promise).
                </p>

                <p>
                    Opcodes in LC3 are four bits in length, and tell the machine
                    what operations to perform. As a result of the opcodes being
                    four bits in length, there are a total 2^4 = 16 possible
                    opcodes. This means that there are only 16 possible
                    instructions in the LC3 language.
                </p>

                <Heading level={3}>Format</Heading>
                <p>
                    In the LC3 language, there are three formats for opcodes...
                    opcodes can be written in Hex, Binary, or in a assembly
                    language. The assembly language is the most human-readable,
                    but the other two are important to understand. This guide
                    will be showing you the binary and assembly language
                    formats.
                </p>

                {/* Logical Operations */}
                <AddInstruction />
                <AndInstruction />
                <NOTInstruction />
                <BRInstruction />

                {/* Loading From Memory */}
                <LDInstruction />
                <LDIInstruction />
                <LDRInstruction />
                <LEAInstruction />

                {/* Storing values */}
                <STInstruction />
                <STIInstruction />
                <STRInstruction />

                {/* Built in Subroutines */}
                <TRAPInstruction />

                {/* PC Changing Instructions */}
                <JRInstruction />
                <RETInstruction />

                <JSRInstruction />
                <JSRRInstruction />

                {/* Advanced */}
                <RTIInstruction />
            </Content>
        </Section>
    );
}
