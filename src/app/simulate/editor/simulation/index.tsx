import { Content } from "~/components/DocComponents";
import { ActionButtons } from "./buttons/actions";
import { RegisterView } from "./registers/registers";
import dynamic from "next/dynamic";
import { InputBuffer } from "./buffers/InputBuffer";
import { OutputBuffer } from "./buffers/OutputBuffer";
import { MemoryWatcher } from "./memory";

interface SimulationProps {}

function SimulationView({}: SimulationProps) {
    return (
        <div className="p-4 bg-black bg-opacity-40 backdrop-blur-sm filter w-full h-full border-t-4 border-gray-200/50 overflow-y-scroll">
            <Content>
                <p className="font-monsterrat text-2xl text-white">
                    <strong>LC3</strong> Code Simulator
                </p>

                <ActionButtons />
                <div className="flex flex-col gap-4 divide-y-2 divide-light-200/50 [&>*]:pt-2 text-white">
                    <RegisterView />
                    <div className="flex flex-col gap-4">
                        <OutputBuffer />
                        <InputBuffer />
                    </div>
                    <MemoryWatcher />
                </div>
            </Content>
        </div>
    );
}

export const Simulation = dynamic(() => Promise.resolve(SimulationView), {
    ssr: false,
});
