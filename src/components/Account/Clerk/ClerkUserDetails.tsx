"use client";

import type { ReactNode } from "react";

import { useOrganization, useSession, useUser } from "@clerk/nextjs";

function Row({
  children,
  desc,
  value,
}: {
  children: ReactNode;
  desc: string;
  value: string;
}) {
  return (
    <div className="relative grid h-[2.125rem] grid-cols-2 items-center">
      <span className="block shrink-0 text-xs font-semibold">{desc}</span>
      <span className="relative block font-mono text-xs text-[#7D7D7E]">
        <span className="block w-full truncate">{value}</span>
        {children}
      </span>
    </div>
  );
}

function PointerC({ label }: { label: string }) {
  return (
    <div
      className={`
        absolute left-full top-1/2 flex w-fit -translate-y-1/2 items-center
        gap-5
      `}
    >
      <div className="relative">
        <div className="h-px w-[6.5rem] bg-[#BFBFC4]" />
        <div
          className={`
            absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45
            bg-[#BFBFC4]
          `}
        />
      </div>
      <div
        className={`
        rounded-md bg-black px-1.5 py-1 font-mono text-xs text-white
      `}
      >
        {label}
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateWithNumbers(date: Date): string {
  return date.toLocaleString("en-US", {
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    month: "numeric",
    second: "2-digit",
    year: "numeric",
  });
}

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  if (!user || !session) {
    return null;
  }

  return (
    <div
      className={`
        relative rounded-lg border border-[#EDEDED] bg-[#F1F1F2] p-16 background
      `}
    >
      <div
        className={`
          max-w-[25rem] rounded-xl bg-white p-8
          shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)]
          ring-1 ring-gray-950/5
        `}
      >
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="relative flex w-full justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="user"
              className="size-20 rounded-full"
              src={user.imageUrl}
            />
            <div
              className={`
                absolute left-full top-1/2 flex w-fit -translate-x-2.5
                -translate-y-1/2 items-center gap-5
              `}
            >
              <div className="relative">
                <div className="h-px w-[6.5rem] bg-[#BFBFC4]" />
                <div
                  className={`
                    absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45
                    bg-[#BFBFC4]
                  `}
                />
              </div>
              <div
                className={`
                  rounded-md bg-black px-1.5 py-1 font-mono text-xs text-white
                `}
              >
                user.imageUrl
              </div>
            </div>
          </div>
          {user.firstName && user.lastName ? (
            <h1
              className={`
                relative w-full text-center text-[1.0625rem] font-semibold
              `}
            >
              {user.firstName} {user.lastName}
              <div
                className={`
                  absolute left-full top-1/2 flex w-fit -translate-x-2.5
                  -translate-y-1/2 items-center gap-5
                `}
              >
                <div className="relative">
                  <div className="h-px w-[6.5rem] bg-[#BFBFC4]" />
                  <div
                    className={`
                      absolute right-0 top-1/2 size-1 -translate-y-1/2 rotate-45
                      bg-[#BFBFC4]
                    `}
                  />
                </div>
                <div
                  className={`
                    rounded-md bg-black px-1.5 py-1 font-mono text-xs text-white
                  `}
                >
                  user.firstName
                </div>
                <div
                  className={`
                    -translate-x-3 rounded-md bg-black px-1.5 py-1 font-mono
                    text-xs text-white
                  `}
                >
                  user.lastName
                </div>
              </div>
            </h1>
          ) : (
            <div className="h-4" />
          )}
        </div>

        <div className="divide-y divide-[#EEEEF0] rounded-lg bg-[#FAFAFB] px-2.5">
          <Row
            desc="Email"
            value={user.emailAddresses?.[0]?.emailAddress || ""}
          >
            <PointerC label="user.emailAddresses[0].emailAddress" />
          </Row>
          <Row desc="Last signed in" value={formatDate(user.lastSignInAt!)}>
            <PointerC label="user.lastSignInAt" />
          </Row>
          <Row desc="Joined on" value={formatDate(user.createdAt!)}>
            <PointerC label="user.createdAt" />
          </Row>
          <Row desc="User ID" value={user.id}>
            <PointerC label="user.user.id" />
          </Row>
        </div>
        <h2 className="mb-4 mt-6 text-[0.9375rem] font-semibold">
          Session details
        </h2>
        <div className="divide-y divide-[#EEEEF0] rounded-lg bg-[#FAFAFB] px-2.5">
          <Row desc="Session ID" value={session.id}>
            <PointerC label="session.id" />
          </Row>
          <Row desc="Status" value={session.status}>
            <PointerC label="session.status" />
          </Row>
          <Row
            desc="Last active"
            value={formatDateWithNumbers(session.lastActiveAt)}
          >
            <PointerC label="session.lastActiveAt" />
          </Row>
          <Row
            desc="Session expiration"
            value={formatDateWithNumbers(session.expireAt)}
          >
            <PointerC label="session.expireAt" />
          </Row>
        </div>
        {organization ? (
          <>
            <h2 className="mb-4 mt-6 text-[0.9375rem] font-semibold">
              Organization detail
            </h2>
            <div
              className={`
                divide-y divide-[#EEEEF0] rounded-lg bg-[#FAFAFB] px-2.5
              `}
            >
              <Row desc="Organization ID" value={organization.id}>
                <PointerC label="organization.id" />
              </Row>
              <Row desc="Name" value={organization.name}>
                <PointerC label="organization.name" />
              </Row>
              <Row desc="Members" value={String(organization.membersCount)}>
                <PointerC label="organization.membersCount" />
              </Row>
              <Row
                desc="Pending invitations"
                value={String(organization.pendingInvitationsCount)}
              >
                <PointerC label="organization.pendingInvitationsCount" />
              </Row>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
