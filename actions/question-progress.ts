"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { questionProgress, questions, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertQuestionProgress = async (questionId: number) => {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    const question = await db.query.questions.findFirst({
        where: eq(questions.id, questionId)
    });

    if (!question) {
        throw new Error("Question not found");
    }

    const groupId = question.groupId;

    const existingQuestionProgress = await db.query.questionProgress.findFirst({
        where: and(
            eq(questionProgress.userId, userId),
            eq(questionProgress.questionId, questionId),
        ),
    });

    const isPractice = !!existingQuestionProgress;

    if (currentUserProgress.hearts === 0 && !isPractice) {
        return {error: "hearts"}
    }

    if (isPractice) {
        await db.update(questionProgress).set({
            completed: true,
        })
        .where(
            eq(questionProgress.id, existingQuestionProgress.id)
        );

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 10),
            points: currentUserProgress.points + 50,
        }).where(eq(userProgress.userId, userId));

        
        revalidatePath("/learn");
        revalidatePath("/group");
        revalidatePath("/leaderboard");
        revalidatePath(`/group/${groupId}`);
        return;
    }

    await db.insert(questionProgress).values({
        questionId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 50,
    }).where(eq(userProgress.userId, userId));

        revalidatePath("/learn");
        revalidatePath("/group");
        revalidatePath("/leaderboard");
        revalidatePath(`/group/${groupId}`);
}