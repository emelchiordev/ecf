<?php

namespace App\Controller;

use App\Entity\Administrator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class InstallController extends AbstractController
{
    #[Route('/install', name: 'app_install')]
    public function index(EntityManagerInterface $entity, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Création d'un compte administrateur
        $password = $this->getParameter('pass_admin');
        $user = new Administrator();
        $user->setEmail($this->getParameter('user_admin'));
        $user->setRoles(["administrator"]);
        $user->setPassword($passwordHasher->hashPassword($user, $password));
        $this->entityManager = $entity;
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->render('install/index.html.twig', [
            'controller_name' => 'InstallController',
        ]);
    }
}
