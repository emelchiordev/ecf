<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class CourseVoter extends Voter
{
    public const EDIT = 'POST_EDIT';
    public const VIEW = 'courses_view';

    protected function supports(string $attribute, $course): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html

        dd($course);
        return in_array($attribute, [self::EDIT, self::VIEW])
            && $course instanceof \App\Entity\Course;
    }

    protected function voteOnAttribute(string $attribute, $course, TokenInterface $token): bool
    {


        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::EDIT:
                // logic to determine if the user can EDIT
                // return true or false
                break;
            case self::VIEW:
                if ($user === $course->getInstructor()->getUser()) {
                    return true;
                }
        }

        return false;
    }
}
