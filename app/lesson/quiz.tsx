"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import {useAudio, useWindowSize, useMount } from "react-use";
import { ResultCard } from "./result-card";
import { useRouter} from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import Image from "next/image";
import Confetti from "react-confetti";
import { usePracticeModal } from "@/store/use-practice-modal";
import VideoPlayer from "./videoPlayer";

type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
}: Props) => {
    const {open: openHeartsModal} = useHeartsModal();
    const {open: openPracticeModal} = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    })

    const {width, height} = useWindowSize();
    const router = useRouter();

    const [finishAudio] = useAudio({src: "/finished.mp3", autoPlay: true});

    const [
        correctAudio,
        _c,
        correctControls,
    ] = useAudio({src: "/correct.mp3"});
    const [
        incorrectAudio,
        _i,
        incorrectControls,
    ] = useAudio({src: "/error.mp3"});

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    })
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
    
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1 );
    };

    const onSelect = (id: number) => {
        if(status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 10));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."))
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    incorrectControls.play();
                    setStatus("wrong");

                    if (!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."))
            })
        }
    };

    if (!challenge) {
        return (
            <>
            {finishAudio}
            <Confetti 
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                tweenDuration={10000}
            />
            <div className="flex flex-col ap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                <Image
                src="/finished.png"
                alt="Finish"
                className="hidden lg:block"
                height={100}
                width={100}
                />
                <Image
                src="/finished.png"
                alt="Finish"
                className="block lg:hidden"
                height={50}
                width={50}
                />
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                    Great Job! <br/> You&apos;ve completed the lesson.
                </h1>
                <div className="flex items-center gap-x-4 w-full">
                    <ResultCard 
                    //@ts-ignore
                        variant="points"
                        value={challenges.length * 10}
                    />
                    <ResultCard 
                    //@ts-ignore
                        variant="hearts"
                        value={hearts}
                    />
                </div>
            </div>
            <Footer 
                lessonId={lessonId}
                status="completed"
                onCheck={() => router.push("/learn")}
            />
            </>
        );
    }

    const title = challenge.type === "ASSIST"
        ? "Select Got it to go next"
        : challenge.question;

    return (
        <>
        {incorrectAudio}
        {correctAudio}
        
    <Header 
        hearts={hearts}
        percentage={percentage}
    />
    <div className="flex-1">
        <div className="h-full flex items-center justify-center">
            <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-900">
                    {title}
                </h1>
                <div >
                    {challenge.type === "ASSIST" && (
                        //@ts-ignore
                        <QuestionBubble question={challenge.question}/>
                    )},
                    {challenge.type === "VIDEO" && (
                        //@ts-ignore
                        <VideoPlayer src={challenge.videoSrc}/>
                    )}
                    <Challenge
                        options={options}
                        onSelect={onSelect}
                        status={status}
                        selectedOption={selectedOption}
                        disabled={pending}
                        type={challenge.type}
                    />
                </div>
            </div>
        </div>
    </div>
    <Footer
    disabled={pending || !selectedOption}
    status={status}
    onCheck={onContinue}
    />
    </>
    );
};