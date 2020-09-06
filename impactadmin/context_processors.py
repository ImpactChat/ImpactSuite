from django.urls import reverse_lazy


def react(request):
    ulang = request.user.locale if request.user.is_authenticated else "en"
    context = {
        "settings":  {
            "username": request.user.username,
            "language": ulang,
            "apps": [
                {
                    "verb": "Chat",
                    "name": "Impact Chat",
                    "link": str(reverse_lazy("impactchat:home"))
                },
                {
                    "verb": "Learn",
                    "name": "Impact Class",
                    "link": str(reverse_lazy("impactclass:home"))
                },
                {
                    "verb": "Plan",
                    "name": "Impact Planner",
                    "link": "a"
                },
            ],
            "links":  {
                "logout": str(reverse_lazy("impactadmin:logout")),
                "profile": str(reverse_lazy("impactadmin:profile")),
                "dashboard": str(reverse_lazy("impactadmin:dashboard")),
                "chat_app": str(reverse_lazy("impactchat:home"))
            }
        }
    }
    if request.user.is_authenticated:
        if request.user.can_administer():
            context['settings']['apps'].append({
                "verb":  "Administer",
                "name": "Impact Admin",
                "link": str(reverse_lazy("impactadmin:administration"))
            })
    return context
