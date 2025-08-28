import dayjs from 'dayjs';
import React from 'react'
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DisplayTechIcons from '@/components/ui/DisplayTechIcons';

//coming from dummyInterview constants
const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt}
    : InterviewCardProps
) => {

    const feedback = null as Feedback | null;

    //to determine the type of the interview as there is 
    // only technical type in the constants file
    const normalizedType = /mix/gi.test(type) ? 'MIxed' : type;

    const formattedDate = dayjs(feedback?.createdAt || createdAt ||
        Date.now()).format('MMM D, YYYY');

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
            <div className="absolute top-0 right-0 w-fit px-4
            py-2 rounded-bl-lg bg-light-600">
                <p className="badge-text">{normalizedType}</p>
            </div>

            <Image src={getRandomInterviewCover()} alt="cover image"
            width={90} height={90} className="rounded-full object-fit size-[90px]" />

            <h3 className="my-5 capitalize">
                {role} Interview
            </h3>

            <div className="flex flex-row gap-5 mt-3">
                <div className="flex flex-row gap-3">
                    <Image src="/calendar.svg" alt="calendar" width={22}
                     height={22} />
                     <p>{formattedDate}</p>
                </div>

                <div className="flex flex-row gap-2 items-center">
                    <Image src="/star.svg" alt="star" width={22}
                    height={22}/>
                    <p>{feedback?.totalScore || '---'}/100</p>
                </div>
            </div>
            
            <p className="line-clamp-2 mt-5">
                {feedback?.finalAssessment || "You haven't taken the interview yet, Take it now to improve your skills"}
            </p>
        </div>

        <div className="flex flex-row justify-between">
            <DisplayTechIcons techStack={techstack}/>

            <Button className='btn-primary'>
                <Link href={feedback ?
                    `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
                />
                {feedback ? 'check feedback' : 'View Interview'}
            </Button>
        </div>

      </div>
    </div>
  )
}

export default InterviewCard
