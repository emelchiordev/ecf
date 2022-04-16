<?php

namespace App\EventListener;

use App\Repository\InstructorRepository;
use App\Repository\StudentRepository;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JwtAddRolesAndAvatar
{


    /**
     * @var RequestStack
     */
    private $requestStack;
    private $instructorRepository;
    private $userRepository;
    private $studentRepository;


    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack, InstructorRepository $instructorRepository, UserRepository $userRepository, StudentRepository $studentRepository)
    {
        $this->requestStack = $requestStack;
        $this->instructorRepository = $instructorRepository;
        $this->userRepository = $userRepository;
        $this->studentRepository = $studentRepository;
    }

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();
        $user = $event->getUser();
        if (in_array("ROLES_INSTRUCTORS", $user->getRoles())) {
            $actualUser = $this->userRepository->findOneBy(['email' => $user->getUserIdentifier()]);
            $instructor = $this->instructorRepository->find($actualUser->getId());
            if ($instructor->avatar->getFilePath() !== null) {
                $payload['avatar'] = $instructor->avatar->getFilePath();
            } else {
                $payload['avatar'] = "/avatar/nullavatar.png";
            }
            $payload['id'] = $instructor->getId();
        }

        if (in_array('ROLES_STUDENT', $user->getRoles())) {
            $actualUser = $this->userRepository->findOneBy(['email' => $user->getUserIdentifier()]);
            $student = $this->studentRepository->find(($actualUser->getId()));
            $payload["id"] = $student->getId();
            $payload["pseudo"] = $student->getPseudonym();
        }

        $payload['roles'] = $user->getRoles();
        $payload['email'] = $user->getUserIdentifier();

        $event->setData($payload);

        $header        = $event->getHeader();
        $header['cty'] = 'JWT';

        $event->setHeader($header);
    }
}
