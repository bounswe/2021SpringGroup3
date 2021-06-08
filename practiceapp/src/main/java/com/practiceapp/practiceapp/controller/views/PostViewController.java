package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.controller.post.CreatePostController;
import com.practiceapp.practiceapp.controller.post.UpdatePostController;
import com.practiceapp.practiceapp.controller.user.CreateUserController;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping(path = "home/post")
public class PostViewController {

    @Autowired
    private CreatePostController createPostController;

    @Autowired
    private UpdatePostController updatePostController;

    @Autowired
    private CreateUserController createUserController;

    @RequestMapping(path = "")
    public String showPostup(Model model){
        return "index";
    }


    @RequestMapping(path = "/create")
    public String createPost(Model model){
        PostEntity post = new PostEntity();
        String user_name = "";
        model.addAttribute("post",post);
        model.addAttribute("user_name", user_name);
        return "create_post";
    }

    @RequestMapping(path = "/create/save")
    public String savePost(@ModelAttribute("post") PostEntity post, @ModelAttribute("user_name") String user_name){
        UserEntity userEntity = createUserController.getUserByName(user_name);
        post.setAuthor(userEntity);
        createPostController.savePost(post);
        return "redirect:/home/post/create";
    }

    @RequestMapping(path = "/update")
    public String updatePost(Model model){
        PostEntity post = new PostEntity();
        model.addAttribute("post",post);
        return "update_post";
    }

    @RequestMapping(path = "/update/save")
    public String saveUpdate(@ModelAttribute("post") PostEntity post){
        updatePostController.updatePost(post);

        return "redirect:/home/post/update";
    }

}


