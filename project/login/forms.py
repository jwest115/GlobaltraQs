from django import forms


class RegisterForm(forms.Form):
    username = forms.CharField(label="username", widget=forms.TextInput(attrs={'class': 'form-control',
                                                                               'placeholder': 'Username'}))
    email = forms.EmailField(label="email", widget=forms.EmailInput(attrs={'class': 'form-control',
                                                                           'placeholder': 'Email'}))
    password = forms.CharField(label='password', widget=forms.PasswordInput(attrs={'class': 'form-control',
                                                                                   'placeholder': 'Password'}))
    password_repeat = forms.CharField(label='password_repeat',
                                      widget=forms.PasswordInput(attrs={'class': 'form-control',
                                                                        'placeholder': 'Re-enter Password'}))


class LoginForm(forms.Form):
    username = forms.CharField(label='username',
                               widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Username'}))
    password = forms.CharField(label='password',
                               widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': "Password"}))


