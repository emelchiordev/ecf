<?php

namespace App\EventListener;

use App\Repository\InstructorRepository;
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


    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack, InstructorRepository $instructorRepository, UserRepository $userRepository)
    {
        $this->requestStack = $requestStack;
        $this->instructorRepository = $instructorRepository;
        $this->userRepository = $userRepository;
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
            $payload['avatar'] = $instructor->avatar->getFilePath();
        }


        $payload['roles'] = $user->getRoles();
        $payload['email'] = $user->getUserIdentifier();

        $event->setData($payload);

        $header        = $event->getHeader();
        $header['cty'] = 'JWT';

        $event->setHeader($header);
    }
}
